import { Component, inject } from '@angular/core';
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

@Component({
    selector: 'dropdowndialog',
    standalone: true,
    templateUrl: 'dropdowndialog.component.html',
    styleUrl: 'dropdowndialog.component.scss',
    imports: [
        MatDialogActions,
        MatButtonModule,
        MatDialogContent,
        MatDialogTitle,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule
    ],
})
export class DropdownDialogComponent {
    novoProduto: any;

    //#region Lifecycle Hooks

    public onInit(): void {
        this.idReceive = this.data.id;
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
        this.dialogRef.close(true);
    }

    //#endregion

    //#region Properties

    public idReceive: number = 0;

    public data = inject(MAT_DIALOG_DATA);
    public readonly dialog = inject(MatDialog);
    readonly dialogRef = inject(MatDialogRef<DropdownDialogComponent>);

    //#endregion
}
