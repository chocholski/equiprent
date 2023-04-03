export class Menu {
    Permissions?: number[];
    Label: string;
    Icon?: string;
    RouterLink?: string[];
    Items?: Menu[];
}

export interface SelectOption {
    Value: number;
    Name: string;
    IsSelected: boolean;
}