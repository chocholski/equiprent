import { PngTableColumn } from '../interfaces/png';
import { LazyLoadEvent } from 'primeng/api';
import { StringBuilder } from './stringBuilder';

export class PngTableSearchQueryBuilder {

    resultUriBuilder = new StringBuilder();

    constructor(private event: LazyLoadEvent, private columns: PngTableColumn[]) { }

    create() {
        this.buildBaseUri();
        this.addFilters();

        return this.resultUriBuilder.toString();
    }

    //TODO - adjust to PrimeNG menu filtering
    addFilters() {
        let whereBuilder = new StringBuilder();

        for (const column of this.columns) {
            const filter = this.event.filters?.[column.field];

            if (filter !== undefined) {
                const replaceWith = column.replaceWith ?? column.field;

                whereBuilder.append(`${replaceWith}|${filter.value}|${column.operator}||`);
            }
        }

        if (whereBuilder.length() > 1) {
            whereBuilder.removeFromEnd(2);
        }

        // this.resultUriBuilder.append(`&f=${whereBuilder.toString()}`);
    }

    buildBaseUri() {
        this.resultUriBuilder.append(`?sf=${this.event.sortField}&so=${this.event.sortOrder}&pc=${this.event.rows}&sr=${this.event.first}`);
    }
}