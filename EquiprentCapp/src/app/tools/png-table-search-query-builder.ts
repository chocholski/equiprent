import { PngTableColumn } from '../interfaces/png';
import { FilterMatchMode, FilterMetadata, LazyLoadEvent, SelectItem } from 'primeng/api';
import { StringBuilder } from './stringBuilder';
import { PrimeNgHelper } from './primeNgHelper';
import { SearchOperatorEnum } from '../enums/search-operator.enum';
import { FilterTypeEnum } from '../enums/filter-type.enum';

export class PngTableSearchQueryBuilder {

    private static DATE_MATCH_MODES = [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_AFTER, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_IS_NOT];

    resultUriBuilder = new StringBuilder();

    constructor(
        private readonly event: LazyLoadEvent,
        private readonly columns: PngTableColumn[]) {
    }

    create() {
        this.buildBaseUri();
        this.addFilters();
        return this.resultUriBuilder.toString();
    }

    public buildBaseUri() {
        this.event.sortField ??= this.columns[0]?.field;
        this.resultUriBuilder.append(`?sf=${this.event.sortField}&so=${this.event.sortOrder}&pc=${this.event.rows}&sr=${this.event.first}`);
    }

    private addFilters() {
        let whereBuilder = new StringBuilder();

        this.addGlobalFilters(whereBuilder);
        this.addLocalFilters(whereBuilder);

        if (whereBuilder.length() > 1) {
            whereBuilder.removeFromEnd(2);
        }

        this.resultUriBuilder.append(`&f=${whereBuilder.toString()}`);
    }

    private addGlobalFilters(whereBuilder: StringBuilder) {
        if (this.event.globalFilter) {
            const globalFilterColumns = this.columns.filter(c => c.applyGlobalFiltering === true);

            for (const column of globalFilterColumns) {
                const replaceWith = column.replaceWith ?? column.field;

                let value: string = this.event.globalFilter;
                let matchMode = FilterMatchMode.CONTAINS;

                if (column.options) {
                    value = column.options.filter(o => o.label?.toLowerCase().includes(value.toLowerCase())).map(o => o.value).join(", ");
                    matchMode = FilterMatchMode.IN;
                }

                whereBuilder.append(`${replaceWith}|${matchMode}|${value}|${SearchOperatorEnum.MatchAny}|${column.filterType}||`);
            }
        }
    }

    private addLocalFilters(whereBuilder: StringBuilder) {
        for (const column of this.columns) {
            const filtersGroup = this.event.filters?.[column.field];

            if (filtersGroup === undefined)
                continue;

            if (column.filterType === FilterTypeEnum.Special && column.replaceWith === undefined)
                continue;

            const replaceWith = column.replaceWith ?? column.field;
            const filters = filtersGroup as FilterMetadata[];

            for (const filter of filters) {
                if (filter.value == null)
                    continue;

                let value = undefined;

                if (Array.isArray(filter.value)) {
                    const filterValues = filter.value as SelectItem[];
                    const valueBuilder = new StringBuilder();

                    filterValues.forEach(fv => valueBuilder.append(`${fv.value},`));

                    if (valueBuilder.length() > 0)
                        valueBuilder.removeFromEnd(1);

                    value = valueBuilder.toString();
                }
                else {
                    value = filter.value;
                }

                if (PngTableSearchQueryBuilder.DATE_MATCH_MODES.find(mode => mode == filter.matchMode))
                    value = PrimeNgHelper.getDateFromCalendarAsString(value);

                whereBuilder.append(`${replaceWith}|${filter.matchMode}|${value}|${filter.operator}|${column.filterType}||`);
            }
        }
    }
}