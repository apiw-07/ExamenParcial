/**
 * @summary Provides receipt presentation and validation behavior.
 * @author Codex (AI-assisted adaptation for Waldo Alonso Portal Inga)
 */
import { Component, DestroyRef, effect, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BookstoresStore } from '../../../../bookstores/application/bookstores.store';
import { CatalogStore } from '../../../../catalog/application/catalog.store';
import { SPECIALTIES } from '../../../../catalog/domain/model/specialty';
import { InventoryStore } from '../../../application/inventory.store';

/** Prevents decimal values in addition to the normal numeric bounds. */
const integerValidator: ValidatorFn = control => control.value == null || Number.isInteger(control.value) ? null : { integer: true };
/** Registers a book batch using automatic store association and receipt time. */
@Component({ selector: 'app-receive-books', standalone: true,
 imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
 MatButtonModule, MatProgressBarModule, TranslatePipe], templateUrl: './receive-books.html', styleUrl: './receive-books.css' })
export class ReceiveBooks {
 readonly stores = inject(BookstoresStore);
 readonly catalog = inject(CatalogStore);
 readonly inventory = inject(InventoryStore);
 private readonly fb = inject(FormBuilder);
 private readonly router = inject(Router);
 private readonly translate = inject(TranslateService);
 private readonly snackbar = inject(MatSnackBar);
 private readonly destroyRef = inject(DestroyRef);
 readonly specialties = SPECIALTIES;
 readonly specialty = signal('');
 readonly bookKey = signal('');
 readonly saveFailed = signal(false);
 readonly selectedStore = computed(() => this.stores.bookstores().find(s => s.specialty === this.specialty()));
 readonly maximumCopies = computed(() => 2 * (this.selectedStore()?.minimumCopies ?? 0));
 readonly selectedBook = computed(() => this.catalog.books().find(b => b.key === this.bookKey()));
 readonly form = this.fb.group({
  specialty: this.fb.nonNullable.control('', Validators.required),
  bookKey: this.fb.nonNullable.control({ value: '', disabled: true }, Validators.required),
  copies: this.fb.control<number | null>(null, [Validators.required, Validators.min(1), integerValidator])
 });
 constructor() {
  void this.stores.load(); this.catalog.clear();
  this.destroyRef.onDestroy(() => this.catalog.clear());
  this.form.controls.specialty.valueChanges.pipe(takeUntilDestroyed()).subscribe(specialty => {
   this.specialty.set(specialty); this.bookKey.set(''); this.saveFailed.set(false);
   this.form.controls.bookKey.reset(''); this.form.controls.copies.reset(null);
   this.catalog.load(specialty);
  });
  this.form.controls.bookKey.valueChanges.pipe(takeUntilDestroyed()).subscribe(key => this.bookKey.set(key));
  effect(() => {
   const store = this.selectedStore();
   this.form.controls.copies.setValidators([Validators.required, Validators.min(1), integerValidator, Validators.max(store ? 2 * store.minimumCopies : 0)]);
   this.form.controls.copies.updateValueAndValidity({ emitEvent: false });
   if (this.catalog.loading() || !this.catalog.books().length || !store || this.inventory.saving()) this.form.controls.bookKey.disable({ emitEvent: false });
   else this.form.controls.bookKey.enable({ emitEvent: false });
  });
 }
 /** Persists successfully before navigating; failed writes leave the form in place. */
 async submit(): Promise<void> {
  this.form.markAllAsTouched();
  const store = this.selectedStore(); const book = this.selectedBook(); const copies = this.form.controls.copies.value;
  if (this.form.invalid || !store || !book || copies == null || this.inventory.saving()) return;
  this.saveFailed.set(false); this.form.disable({ emitEvent: false });
  try {
   await this.inventory.receive(store, book, copies);
   this.snackbar.open(this.translate.instant('receipt-success'), this.translate.instant('close'), { duration: 4500 });
   await this.router.navigate(['/bookstores/overview']);
  } catch {
   this.saveFailed.set(true); this.form.enable({ emitEvent: false });
  }
 }
 /** Cancels without submitting a stock record. */
 cancel(): void { if (!this.inventory.saving()) void this.router.navigate(['/bookstores/overview']); }
 retryCatalog(): void { this.catalog.load(this.specialty()); }
}
