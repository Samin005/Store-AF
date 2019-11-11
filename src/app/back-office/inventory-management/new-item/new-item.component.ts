import {Component, OnInit} from '@angular/core';
import {Item} from '../../../model/item.model';
import {ItemsService} from '../../../service/items.service';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {CompaniesService} from '../../../service/companies.service';


@Component({
    selector: 'app-new-item',
    templateUrl: './new-item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    item = new Item();
    imgThumbnailUrls = [];
    imagesForUpload = [];

    constructor(public itemsService: ItemsService,
                private afStorage: AngularFireStorage,
                private companiesService: CompaniesService) {
    }

    ngOnInit() {
    }

    updateImgPaths(event) {
        const files = event.target.files;
        if (files) {
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imgThumbnailUrls.push(e.target.result);
                };
                reader.readAsDataURL(file);
                this.item.imgPaths.push(file.name);
                this.imagesForUpload.push(file);
            }
        }
    }

    removeFromImgPaths(url) {
        const index = this.imgThumbnailUrls.indexOf(url);
        if (index !== -1) {
            this.imgThumbnailUrls.splice(index, 1);
            this.item.imgPaths.splice(index, 1);
            this.imagesForUpload.splice(index, 1);
        }
    }

    addItem() {
        this.item.id = this.item.name;
        this.item.createDate = new Date();
        this.item.lastModified = new Date();
        this.uploadSelectedImagesAndSave();
    }

    uploadSelectedImagesAndSave() {
        Swal.fire({
            title: 'Uploading Images (0%)',
            html: '<div class="progress mb-4"> <div class="progress-bar bg-primary-custom" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div> </div>',
            showConfirmButton: false
        }).finally();
        const uploadPath = 'img/' + this.companiesService.companyID + '/items/' + this.item.id + '/';
        this.updateImgPathsWithItemID(uploadPath);
        const totalImages = this.imagesForUpload.length;
        let imagesUploaded = 0;
        let totalUploadProgress = 0;
        this.imagesForUpload.forEach((img) => {
            const task = this.afStorage.upload(uploadPath + img.name, img);
            task.percentageChanges().subscribe(progress => {
                if (progress === 100) {
                    imagesUploaded++;
                }
                totalUploadProgress = +((imagesUploaded / totalImages) * progress).toFixed(2);
                Swal.update({
                    title: 'Uploading Images (' + totalUploadProgress + '%)',
                    html: '<div class="progress mb-4"><div class="progress-bar bg-primary-custom" role="progressbar" style="width: ' + totalUploadProgress + '%;" aria-valuenow="' + totalUploadProgress + '" aria-valuemin="0" aria-valuemax="100"></div></div>'
                });
                if (imagesUploaded === totalImages && progress === 100) {
                    // to show 100% in progress
                    setTimeout(() => this.saveItemInfo(), 100);
                    // this.saveItemInfo();
                }
            }, error => {
                Swal.fire({
                    title: 'Error',
                    type: 'error',
                    text: error
                }).finally();
            });
        });
    }

    updateImgPathsWithItemID(directory) {
        for (let i = 0; i < this.item.imgPaths.length; i++) {
            this.item.imgPaths[i] = directory + this.item.imgPaths[i];
        }
    }

    saveItemInfo() {
        this.itemsService.addItem(this.item);
        this.resetItemValues();
    }

    resetItemValues() {
        this.item = new Item();
        this.imgThumbnailUrls = [];
        this.imagesForUpload = [];
    }

}
