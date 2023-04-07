import { PngTableColumn } from '../interfaces/png';
import { LazyLoadEvent } from 'primeng/api';
export class PngTableSearchQueryBuilder {
    resultUri: string;
    constructor(private event: LazyLoadEvent, private columns: PngTableColumn[]) { }
    build() {
        this.buildBaseUri();
        this.addFilters();

        return this.resultUri;
    }

    addFilters() {
        let where = '';

        for (const column of this.columns) {
            const f = this.event.filters?.[column.field];

            if (f !== undefined) {
                const replaceWith = column.replaceWith ?? column.field;
                where += `${replaceWith}|${f.value}|${column.operator}||`;
            }
        }

        if (where.length > 1) {
            where = where.slice(0, -2);
        }

        this.resultUri += `&f=${where}`;
    }

    buildBaseUri() {
        this.resultUri = `?sf=${this.event.sortField}&so=${this.event.sortOrder}&pc=${this.event.rows}&sr=${this.event.first}`;
    }
}