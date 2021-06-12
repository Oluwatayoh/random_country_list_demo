import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {
    private options = {
        headers: new HttpHeaders().set("x-rapidapi-key", "7f4a536a62msh46506d3a664fa51p126046jsnc6a4e5d03ac8").set(
            "x-rapidapi-host", "the-sneaker-database.p.rapidapi.com")
    };

    baseUrl: String = environment.apiUrl;

    constructor(private http: HttpClient) {

    }

    getAllCountires(req: any): Observable<any> {
        return this.getList(`${this.baseUrl}`, req);
    }

    public getList(url: string, request: any): Observable<any> {
        if (request == null) {
        } else {
            const page = request.start; // > 0 ? (request.start / request.length) : request.start;
            url += `?offset=${page}&limit=${request.length}&`;
            const columns = request.columns;

            if (request.order) {
                let n = 0;
                request.order.forEach((order) => {
                    if (n < 1) {
                        url += `sort-field=${columns[order.column].name}&sort-order=${order.dir.toUpperCase()}&`;
                    }
                    n++;
                });
            }
            if (request.hasOwnProperty('search') && request.search.value) {
                url += `filter=${request.search.value}&`;
            }

            if (request.extra) {
                JSON.parse(request.extra).map((obj, index) => {
                    url += `${obj.name}=${obj.value}&`;
                });
            }
        }

        return this.http.get(url).pipe(map(res => {
            const data: any = res;
            if (data.code !== 96) {
                const count = data.data.total;
                return {
                    recordsTotal: data.total,
                    recordsFiltered: data.total,
                    data: data.data,
                    draw: 5
                };
            } else {
                return {
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: []
                };
            }
        }));

    }
}
