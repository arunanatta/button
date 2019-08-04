import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { ApiService } from '../../common/services/api.service';
import { PTWSettings } from '../ptw.settings';
@Injectable({
    providedIn: 'root'
})
export class PtwRaiseFormService {
    constructor(private _apiService: ApiService) { }

    // readNotification() {
    //     const url = AppSettings.API.NotificationRead;
    //     return this._apiService.callApi({ url, method: 'get', body: null });
    // }

    get_work_involve_data() {
        let url = AppSettings.API.GET_PTW_WORK_INVOLVES_LIST;
        // return this._apiService.callApi()
        console.log("get work involve list function in service", url)
        return this._apiService.callApi(url, 'get', null);

        // return this._apiService.callApi({ url,'GET', body: null });

    }

    submitPtwDocuments(data) {
        let url = PTWSettings.API.ADD_PTW_ATTACHMENT_TABLE;

        return this._apiService.callApi(url, 'post', data);
    }

    get_attachment_table() {
        let url = PTWSettings.API.GET_PTW_DOC_TYPE;
        return this._apiService.callApi(url, 'get', null);
    }

    get_ptw_roles() {
        let url = PTWSettings.API.GET_PTW_ROLE;
        return this._apiService.callApi(url, 'get', null);
    }

    // get_work_require_list_data() {
    //     let url = AppSettings.API.GET_PTW_WORK_REQUIRE_LIST

    //     console.log("get work require function in service", url)
    //     return this._apiService.callApi(url, 'get', null);
    // }

    // get_job_location_list_data() {
    //     let url = AppSettings.API.GET_PTW_JOB_LIST

    //     console.log("get job location function in service", url)
    //     return this._apiService.callApi(url, 'get', null);
    // }


}
