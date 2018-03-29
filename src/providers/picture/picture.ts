import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
//ICI ca foirre j'arrive pas a installer ionic camera etc...
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Observable';
import { switchMap, tap } from 'rxjs/operators';

import { config } from '../../app/config';
import { QimgImage } from '../../models/qimg-image';

/*
  Generated class for the PictureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PictureProvider {

  constructor(/*ICI AUSSI FAUT VOIR AVEC L?INSTALLATION DE MERDE private camera: Camera,*/ public http: HttpClient) {
    console.log('Hello PictureProvider Provider');
    console.log('@@@ http client', !!this.http);
  }

   /**
   * Takes a picture, uploads it to the qimg API, and returns the created image.
   *
   * Returns an observable that will emit the created QimgObject if the picture
   * has been taken and successfully uploaded to the qimg API. An error may be
   * emitted instead if the user does not take a picture of if the upload fails.
   */
  //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
  /*takeAndUploadPicture(): Observable<QimgImage> {

    // Take a picture.
    // This creates an observable of picture data.
    const pictureData$ = this.takePicture();

    // Once the picture has been taken, upload it to the qimg API.
    // This returns a new observable of the resulting QimgImage object.
    const uploadedImage$ = pictureData$.pipe(switchMap(data => this.uploadPicture(data)))

    // Once the picture has been uploaded, log a message to the console
    // indicating that all went well.
    // This does not change the observable stream.
    const debug$ = uploadedImage$.pipe(tap(image => console.log(`Successfully uploaded picture to ${image.url}`)));

    // Return the observable stream.
    return debug$;
  }*/


  //SUSPENS SUR CETTE TAKEPICTURE
  /**
   * Launches the camera to take a picture.
   *
   * Returns an observable that will emit the raw picture data as a string
   * once the picture has been taken. An error may be emitted instead if the
   * user does not take a picture.
   */
  //CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
  /*private takePicture(): Observable<string> {

    // Prepare camera options.
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // Start taking a picture.
    // The promise will be resolved when the user has snapped and validated the picture.
    // It may be rejected if the user does not take a picture.
    const pictureDataPromise = this.camera.getPicture(options);

    // Convert the promise to an observable and return it.
    return Observable.fromPromise(pictureDataPromise);
  }*/

  /**
   * Uploads raw picture data to the qimg API.
   *
   * Returns an observable that will emit the created QimgImage object.
   * An error may be emitted instead if the upload fails.
   */
  private uploadPicture(pictureData: string): Observable<QimgImage> {

    const requestBody = {
      data: pictureData
    };

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${config.qimgSecret}`
      }
    };

    return this.http.post<QimgImage>(`${config.qimgUrl}/images`, requestBody, requestOptions);
  }

}
