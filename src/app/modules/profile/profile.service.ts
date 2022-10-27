import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(any: any): Observable<number | undefined> {
    const filePath = `${this.basePath}/${any.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, any.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          any.url = downloadURL;
          any.name = any.file.name;
          this.saveFileData(any);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(any: any): void {
    this.db.list(this.basePath).push(any);
  }

  getFiles(numberItems: number): AngularFireList<any> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  deleteFile(any: any): void {
    this.deleteFileDatabase(any.key)
      .then(() => {
        this.deleteFileStorage(any.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}