import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogTitle,
    MatDialogContent,
    MatDialogRef,
    MatDialogActions,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'dropdowndialog',
    standalone: true,
    templateUrl: 'dropdowndialog.component.html',
    styleUrl: 'dropdowndialog.component.scss',
    imports: [
        MatDialogActions,
        MatButtonModule,
        MatDialogTitle,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule
    ],
})
export class DropdownDialogComponent {

    //#region Lifecycle Hooks

    public ngOnInit(): void {
        this.idReceive = this.data.id;

        this.formData.patchValue(this.data);
    }

    //#endregion

    //#region Public Methods

    public openDialog(): void {
        this.dialog.open(DropdownDialogComponent);
    }

    public clickClosed(): void {
        this.dialogRef.close(false);
    }

    public clickOk(): void {
        this.dialogRef.close(this.formData.getRawValue());
    }

    //#endregion

    //#region Properties

    public formData = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('')
    });

    public idReceive: number = 0;

    public data = inject(MAT_DIALOG_DATA);
    public readonly dialog = inject(MatDialog);
    readonly dialogRef = inject(MatDialogRef<DropdownDialogComponent>);

    //#endregion
}
