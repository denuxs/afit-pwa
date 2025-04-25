import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Comment, CommentDto, User } from 'app/domain';
import { CommentService } from 'app/services';
import { TimeAgoPipe } from 'app/pipes/time-ago.pipe';
import { UserService } from 'app/core/services';

import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ReactiveFormsModule, ConfirmDialogModule, TimeAgoPipe],
  providers: [ConfirmationService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _confirmationService = inject(ConfirmationService);

  private readonly _commentService = inject(CommentService);
  private readonly _userService = inject(UserService);

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() exerciseId!: number;

  commentForm!: FormGroup;

  objectId: number = 11;
  user!: User;
  comments!: Comment[];

  ngOnInit(): void {
    this.commentForm = this._formBuilder.group({
      content: ['', [Validators.required]],
    });

    this._userService.user$.subscribe((user) => {
      this.user = user;
      this.getComments();
    });
  }

  getComments() {
    const params: any = {
      content_type: this.objectId,
      object_id: +this.exerciseId,
      user: this.user.id,
    };

    this._commentService
      .fetchComments(params)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

  saveComment() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    const { content } = this.commentForm.value;
    const form: CommentDto = {
      content: content,
      content_type: this.objectId,
      object_id: +this.exerciseId,
      user: this.user.id,
    };

    this._commentService
      .saveComment(form)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (comment: Comment) => {
          this.getComments();
          this.commentForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  canDelete(comment: Comment): boolean {
    return comment.user.id === this.user.id;
  }

  handleDelete(commentId: number): void {
    this._confirmationService.confirm({
      message: '¿Estás seguro que deseas eliminar este comentario?',
      header: 'Eliminar comentario',
      // icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-info',
      rejectButtonStyleClass: 'p-button-outlined p-button-secondary',
      accept: () => {
        this.deleteComment(commentId);
      },
    });
  }

  deleteComment(id: number) {
    this._commentService.deleteComment(id).subscribe((res) => {
      this.getComments();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
