import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {

  constructor() { }
  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  sig!: SignaturePad;

  ngOnInit() {
    this.sig = new SignaturePad(this.canvas.nativeElement);
  }
  save() {
    let base64 = this.sig?.toDataURL();
    const textToBLOB = new Blob([base64], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.
    let newLink = document.createElement("a");
    newLink.download = sFileName;
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
    newLink.click();
  }
  clear()
  {
    this.sig.clear();
  }
}
