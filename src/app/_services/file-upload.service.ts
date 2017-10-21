import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FileItem } from '../_directives/file';
import * as _ from 'lodash';

@Injectable()
export class FileUploadService {

  private IMAGES_FOLDER: string = 'images';

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { }
 

} 
