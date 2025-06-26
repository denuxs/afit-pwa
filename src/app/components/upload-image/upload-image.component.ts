import { Component, inject, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ImageService } from 'app/services';
import { Image } from 'app/domain';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CarouselModule,
    ImageModule,
    ConfirmDialogModule,
    AsyncPipe,
    ButtonModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent implements OnInit {
  private readonly _imageService = inject(ImageService);
  private readonly _confirmationService = inject(ConfirmationService);

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() contentType = 0;
  @Input() objectId = 0;

  images$!: Observable<Image[]>;

  ngOnInit(): void {
    if (this.objectId && this.contentType) {
      this.getImages(this.objectId, this.contentType);
    }
  }

  getImages(object_id: number, contentType: number) {
    this.images$ = this._imageService.all({
      object_id: object_id,
      content_type: contentType,
      paginator: null,
    });
  }

  handleUploadImage(event: any): void {
    const file: File = event.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('object_id', this.objectId.toString());
    formData.append('content_type', this.contentType.toString());

    this.saveImage(formData);
  }

  saveImage(form: FormData): void {
    this._imageService
      .create(form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this.getImages(this.objectId, this.contentType);
        },
      });
  }

  handleConfirmDelete(imageId: number): void {
    this._confirmationService.confirm({
      message: 'Se eliminará este imagen. ¿Está seguro?',
      header: 'Confirmar',
      // icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-info',
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
      accept: () => {
        this.handleDelete(imageId);
      },
    });
  }

  handleDelete(imageId: number): void {
    this._imageService
      .delete(imageId)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: () => {
          this.getImages(this.objectId, this.contentType);
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
