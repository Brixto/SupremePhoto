import { Component } from '@angular/core';
import { PhotoLibrary } from '@ionic-native/photo-library';

@Component({
  selector: 'app-swipe',
  templateUrl: 'swipe.page.html',
  // styleUrls: ['swipe.page.scss'],
})
export class SwipePage {
    constructor(private photoLibrary: PhotoLibrary) {
        console.log('Swipe Page');
        this.photoLibrary.requestAuthorization().then(() => {
            this.photoLibrary.getLibrary().subscribe({
                next: library => {
                    library.forEach(function(libraryItem) {
                        console.log(libraryItem.id);
                    });
                }
            });
        });
    }
}
