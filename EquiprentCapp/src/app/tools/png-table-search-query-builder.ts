import { PngTableColumn } from '../interfaces/png';
import { FilterMetadata, LazyLoadEvent, SelectItem } from 'primeng/api';
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
            const filtersGroup = this.event.filters?.[column.field];

            if (filtersGroup !== undefined) {
                const replaceWith = column.replaceWith ?? column.field;
                const filters = filtersGroup as FilterMetadata[];

                for (const filter of filters) {
                    if (filter.value == null)
                        continue;

                    let value = new StringBuilder();

                    if (Array.isArray(filter.value)) {
                        const filterValues = filter.value as SelectItem[];

                        filterValues.forEach(fv => value.append(`${fv.value},`));

                        if (value.length() > 0)
                            value.removeFromEnd(1);
                    }
                    else {
                        value = filter.value;
                    }

                    whereBuilder.append(`${replaceWith}|${filter.matchMode}|${value.toString()}|${filter.operator}||`);
                }
            }
        }

        if (whereBuilder.length() > 1) {
            whereBuilder.removeFromEnd(2);
        }

        this.resultUriBuilder.append(`&f=${whereBuilder.toString()}`);
    }

    buildBaseUri() {
        this.resultUriBuilder.append(`?sf=${this.event.sortField}&so=${this.event.sortOrder}&pc=${this.event.rows}&sr=${this.event.first}`);
    }
}