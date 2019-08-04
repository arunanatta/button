import { Component, ElementRef, OnInit, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { PtwRaiseFormService } from './ptw-raise-form_service';
import * as moment from 'moment';
import { EncryptionService } from '../../common/services/encryption.service'
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: 'app-ptw-raise-form',
  templateUrl: './ptw-raise-form.component.html',
  styleUrls: ['./ptw-raise-form.component.styl']
})
export class PtwRaiseFormComponent implements OnInit {
  coun: any = [];
  count1: any;
  role: any = [];
  roles: any = [];
  typeDoc: any = [];
  public form_step = 2;
  trade: string;
  trades: any = [];
  work_require_list_data: any = [];
  ptw: string;
  ptws: any = [];
  plant: string;
  plants: any = [];
  material: string;
  materials: any = [];
  defaultVal: number;
  public count: any;
  myForm: FormGroup;
  file: any;
  doc_method: string;
  doc_type: number;
  ptw_id: number = 1;
  ptw_ref_id: string = "AK123";
  status: string = "Acive";
  createdBy: string = "Akv";
  doctype: any = [];
  Upload_type: number;
  reference_link: string;
  result: any = [];
  ptwtitle: any;
  work_involve_data: any = [];
  work_involve_data_selected: any;
  // public _encDec: EncryptionService,
  work_involve_selected_list_arr: any = [];
  work_require_list_arr: any = [];
  job_location_list_data: any = [];
  job_location_list_data_temp: any = [];
  job_location_selected: string;
  title: string;
  ptw_type: string;
  hazardous_work: string;
  work_order_num: any;
  type_of_work: any;
  high_hazard_work: any;
  type_of_permit: any;
  work_order: any;
  discription: any;
  emergency: any;
  to_date: any;
  from_date: any;
  work_involve_store_list_arr: any = [];
  work_require_store_list_arr: any = [];

  list: any;

  constructor(private _encDec: EncryptionService, private formBuilder: FormBuilder, private toaster: ToastrManager, private _PtwRaiseFormService: PtwRaiseFormService, private router: Router) { }
  array: any = [];
  ngOnInit() {
    this.getptwroles();
    // this.getptwdoctype();
    this.myForm = this.formBuilder.group({
      formArray: this.formBuilder.array([this.formArray()]),
    });

  }
  formArray() {
    return this.formBuilder.group({
      file: []
    })
  }

  // get_job_location_list_data() {

  //   console.log("get joblocation data");
  //   this._PtwRaiseFormService.get_job_location_list_data().subscribe(data => {
  //     console.log("before_decrypt joblocation", data);

  //     this.job_location_list_data = data.data;
  //   });
  // }


  getptwdoctype() {
    this._PtwRaiseFormService.get_attachment_table().subscribe(data => {
      console.log(data, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      data = this._encDec.decrypt(data.edc);

      this.doctype = data.data;
      console.log(this.doctype, "dataaaaaaa")
    });
  }

  getptwroles() {
    this._PtwRaiseFormService.get_ptw_roles().subscribe(data => {
      console.log(data, 'rplesssssssssssssssss')
      //  data = this._encDec.decrypt(data.edc);

      this.typeDoc = data.data;
      console.log('aruna', this.typeDoc)
      console.log('yyyyyyyyy', this.typeDoc[0].roletype)
      for (let i = 0; i < this.typeDoc.length; i++) {
        if (this.typeDoc[i].roletype == "General") {
          this.role.push(this.typeDoc[i])
        }
        else if (this.typeDoc[i].roletype == "Specific") {
          this.roles.push(this.typeDoc[i])
        }
      }
      console.log('rrrrrrrrrrrrrr', this.role)
      console.log('pppppppp', this.roles)
      this.role.map(function (element) {
        element.count = 0;
      })
      console.log('1111111111', this.role)

      this.roles.forEach((element, index) => {
        element.count = 0;
        //   this.coun[index] = 0;
      });
      console.log(this.typeDoc, "roless")
    });
  }


  // array.push({
  //   id: element.id,
  //   count:this.count[index]
  //       })

  removeformArray(i: number) {
    const control = <FormArray>this.myForm.controls["formArray"];
    control.removeAt(i);
  }
  addformArray() {
    const control = <FormArray>this.myForm.controls["formArray"];
    control.push(this.formArray());
  }
  stepgo(step: any) {
    if (step == 1) {
      this.form_step = step;
    } else if (step == 2) {
      this.getptwroles();
      this.form_step = step;
    } else if (step == 3) {
      this.form_step = step;
      this.submit_this_page();
    }
    else if (step == 4) {
      this.form_step = step;
    }
  }
  ptwForm() {
    // this.ptwtitle
    // let obj = {
    //   ptwtitle: this.ptwtitle
    // }

  }
  onClick() {
    this.trades.push({ name: this.trade });
    this.trade = '';
  }
  ptwRoles() {
    this.ptws.push({ name: this.ptw });
    this.ptw = '';
  }

  onPlantEstimate() {
    this.plants.push({ name: this.plant });
    this.plant = '';
  }

  onMaterials() {
    this.materials.push({ name: this.material });
    this.material = '';
  }

  onAdd(i: any) {
    console.log('***********', i)
    // this.count[i]++;
    this.role[i].count++;
    // this.count1 = this.count++;
    // console.log("111111111111111", this.count1);
  }
  onSub(i: any) {
    this.count[i]--;
  }

  onAdd1(i: any) {
    console.log('***********', i)
    this.coun[i]++;
  }
  onSub1(i: any) {
    this.coun[i]--;
  }


  manpower() {

    this.role.forEach(element => {
      if (element.count > 0) {
        let result = {
          ptw_id: 1,
          ptw_ref_id: "fgfgfg",
          type: this.role.rid,
          categories: this.role.roletype,
          number: this.reference_link,
          status: this.status,
          createdBy: sessionStorage.getItem('userid')
        }
      }
    });

    // let result1 = {

    //   ptw_id: 1,
    //   ptw_ref_id: "fgfgfg",
    //   type: "",
    //   categories: Number(""),
    //   number: this.reference_link,
    //   status: this.status,
    //   createdBy: sessionStorage.getItem('userid')
    // }

    this._PtwRaiseFormService.submitManpower(result1).subscribe((data: any) => {
      data = this._encDec.decrypt(data.edc);
      if (data.success) {
        this.toaster.successToastr("Upload content successfully");

        console.log("file upload success", data);
      } else {
        this.toaster.errorToastr('Something went wrong');
        console.log("failed to file upload");

      }
    })
  }






  goPPMPDetails() {
    this.router.navigate(['/PTW/PPMP_Details'])
  }
  submit_this_page() {
    this.getptwdoctype();
    console.log("submit 1st page");
    //  console.log(this.work_involve_data_selected);
  }

  uploadType: any;
  imageName: any;
  finalObject: { file: FileReader; filename: any; };
  imageSrc: any;
  intermediateDetails: any;
  intermediateArr: any = [];
  docInfo: any;

  // File event
  selectFile(event: any, type: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file read here", file);
      console.log('11111111111', this.Upload_type)
      console.log('Link', this.reference_link);
      // console.log('arunaaaa', this.file.name);

      console.log('nameeee', file.name)
      let fileExtension = file.name.substr((file.name.lastIndexOf('.') + 1));
      console.log('extennnnnnnnnnn', fileExtension);
      if (fileExtension == " ") {
        this.doc_method == "Link";
      }
      else {
        this.doc_method == "Upload"
      }
      this.uploadType = type;

      console.log('uploadtypeeeeeeeeeeeee', this.uploadType);

      let extType = '';
      switch (type) {
        case 'formArray':
          extType = 'pdf|png|PDF|PNG|txt';
          this.imageName = file.name;
          break;
        default:
          // others
          this.imageName = file.name;
          extType = 'pdf|png|jpg|jpeg|PDF|PNG|JPG|JPEG|txt';
          break;
      }



      //   console.log('arunaaaaa',extType)

      const lastIndex = file.name.lastIndexOf('.');
      console.log('lastIndex', lastIndex);
      // console.log('typeeeeee', this.extType)
      const reader = new FileReader();
      if (!extType.includes(file.name.substr(lastIndex + 1, file.name.length))) {
        // this.toaster.warningToastr('invalid format');
        return;
      }
      reader.onload = this._selectFile.bind(this);
      reader.readAsDataURL(file);
      this.finalObject = {
        file: reader,
        filename: file.name
      }
    }

  }

  _selectFile(e: any) {
    const reader = e.target;
    this.imageSrc = reader.result;

    console.log('arunaaaaaaa', this.uploadType);

    switch (this.uploadType) {
      case 'formArray':
        this.intermediateDetails = this.imageSrc;
        this.intermediateArr.push(this.intermediateDetails);
        console.log(this.intermediateArr, "aaaaaaaaaaaaaa");

        break;
      default:
        console.log('in others');
        break;
    }
  }




  // Final upload
  uploadFiles() {
    // const myValue = this.myForm.value;
    console.log('Link', this.reference_link);
    console.log("value", this.Upload_type);
    let Result;
    //  console.log('arunaaaa', this.file.name);

    if (this.reference_link == undefined) {
      const myFormArr = this.myForm.value;
      const finalFormArr = myFormArr.formArray;
      for (let i = 0; i < finalFormArr.length; i++) {

        this.docInfo = this.intermediateArr[i];
        console.log(this.docInfo, "sssssssssssssssss");

        this.file = finalFormArr[i].file.substring(finalFormArr[i].file.indexOf("h") + 2, finalFormArr[i].file.length);
        const createdDate = new Date();


        let finalDocArray = {

          ptw_id: this.ptw_id,
          ptw_ref_id: this.ptw_ref_id,
          file_name: this.file,
          doc_type: Number(this.Upload_type),
          doc_path: this.docInfo,
          doc_method: "Upload",
          status: this.status,
          createdBy: sessionStorage.getItem('userid')
        }
        console.log(finalDocArray, "sssssssss")
        Result = finalDocArray;

      }
    }

    else {
      const createdDate = new Date();

      let finalDocArray1 = {

        ptw_id: this.ptw_id,
        ptw_ref_id: this.ptw_ref_id,
        file_name: "",
        doc_type: Number(""),
        doc_path: this.reference_link,
        doc_method: "Link",
        status: this.status,
        createdBy: sessionStorage.getItem('userid')
      }

      console.log('eeeeeeeeeeeeeee', finalDocArray1)
      Result = finalDocArray1;
    }

    this._PtwRaiseFormService.submitPtwDocuments(Result).subscribe((data: any) => {
      data = this._encDec.decrypt(data.edc);
      if (data.success) {
        this.toaster.successToastr("Upload content successfully");

        console.log("file upload success", data);
      } else {
        this.toaster.errorToastr('Something went wrong');
        console.log("failed to file upload");

      }
    })


  }




  //    this.work_require_list_data.map(item => {
  //   // this.work_require_store_list_arr.push()
  //   let form_store_obj = {
  //     ptw_ref_id: ptw_inserted_obj.ptw_ref_id,
  //     ptw_id: ptw_inserted_obj.id,
  //     wrl_id: item.wrl_id,
  //     status: "Active",
  //     createdBy: emp_id
  //   }
  //   this._PtwRaiseFormService.save_ptw_work_required(form_store_obj).subscribe(data => {
  //     console.log("inserted data of ptw_work_require", data)
  //   })
  // })
  //     });

  //   }
}