import { ChangeService } from '../services/change.service';
import { CalcService } from '../services/calc.service';
export class DefaultRecipe implements Recipe {

    constructor(
        public name: string,
        public style: string,
        public vital: DefaultVital,
        public amountFermentables: number,
        public fermentables: DefaultFermentable[],
        public amountHops: number,
        public hops: DefaultHop[]
    ) {}


}

export class DefaultVital implements Vital {
    constructor(
        public batchSize: number,
        public og: number,
        public fg: number,
        public abv: number,
        public ibu: number,
        public bugu: number,
        public efficiency: number,
        public bv: number
    ) {}
}

export class DefaultFermentable implements Fermentable {
    constructor(
        public name: string,
        public amount: number,
        public type: FermentableType, // Adjunct, Extract, Grain, Sugar
        public srm: number,
        public potential: number,
        public use: FermentableUse // Boil, etc
    ) {}
}

export enum FermentableType {
    Adjunct, Extract, Grain, Sugar
}

export enum FermentableUse {
    Mash, Recirculating, Boil, Fermentation, Maduration
}

export class DefaultHop implements Hop {
    constructor(
        public name: string,
        public alpha: number,
        public beta: number,
        public cohumulone: number,
        public amount: number,
        public use: HopUse,
        public temperature: number, // mas que nada para Arome, a que temperatura se hizo el uso del lupulo.
        public time: number,
        public form: HopForm
    ) {}
}

export enum HopUse {
    Mash, FWH, Boil, Aroma, DryHop
}

export enum HopForm {
    Pellet, WholeLeaf, Plug
}

export class EditableRecipe {

    constructor(
        public recipe: Recipe,
        private calcService: CalcService,
        private changeService: ChangeService
    ) {}

    change(field: string) {
        console.log('change', field);
        this.changeService.change(field, this);
    }
}

const defaultRecipe = {
    STYLE: {}
};

/**
 * @todo #3:15m/DEV add missing fields.
 */
export class Bom1Recipe implements Recipe {

    private _fermentables: Fermentable[];
    private _hops: Hop[];
    private _vital: Vital;

    constructor(private obj: any = defaultRecipe, private calcService: CalcService) {
        this._fermentables = this.obj.FERMENTABLES.FERMENTABLE.map(f => new Bom1Fermentable(f, this.calcService));
        this._hops = this.obj.HOPS.HOP.map(h => new Bom1Hop(h, this.calcService));
        this._vital = new Bom1Vital(this.obj, this.calcService);
    }

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
    }
    get style(): string {
        return this.obj.STYLE.NAME;
    }
    set style(value: string) {
        this.obj.STYLE.NAME = value;
    }
    get vital(): Vital {
        return this._vital;
    }
    set amountFermentables(value: number) {
        this.obj.totalAmount = value;
    }
    get amountFermentables(): number {
        return this.obj.totalAmount;
    }
    set amountHops(value: number) {
        this.obj.totalHop = value;
    };
    get amountHops(): number {
        return this.obj.totalHop;
    }
    get fermentables(): Fermentable[] {
        return this._fermentables;
    }
    get hops(): Hop[] {
        return this._hops;
    }
}

export class Bom1Vital implements Vital {
    constructor(private obj: any, private calcService: CalcService) {}

    get batchSize(): number {
        return this.obj.BATCH_SIZE;
    }
    set batchSize(value: number) {
        this.obj.BATCH_SIZE = value;
    }
    get og(): number {
        return this.obj.OG;
    }
    set og(value : number) {
        this.obj.OG = value;
    }
    get fg(): number {
        return this.obj.FG;
    }
    set fg(value: number) {
        this.obj.FG = value;
    }
    get abv(): number {
        return this.obj.ABV;
    }
    set abv(value: number) {
        this.obj.ABV = value;
    }
    get ibu(): number {
        return this.obj.CALCIBU;
    }
    set ibu(value: number) {
        this.obj.CALCIBU = value;
    }
    get bugu(): number {
        return this.calcService.balance(this.obj.CALCIBU, this.obj.OG);
    }
    get efficiency(): number {
        return this.obj.EFFICIENCY;
    }
    set efficiency(value: number) {
        this.obj.EFFICIENCY = value;
    }
    get bv(): number {
        return this.obj.BV;
    }
    set bv(value: number) {
        this.obj.BV = value;
    }
}

export class Bom1Fermentable implements Fermentable {
    
    constructor(private obj: any, private calcService: CalcService) {}

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
    }
    get amount(): number {
        return this.obj.AMOUNT;
    }
    set amount(value: number) {
        this.obj.AMOUNT = value;
    }
    get type(): FermentableType {
        return this.obj.NAME.toLowerCase().indexOf('sugar') !== -1 ? FermentableType.Sugar : FermentableType.Grain;
    }
    get srm(): number {
        return this.obj.COLOR;
    }
    set srm(value: number) {
        this.obj.COLOR = value;
    }
    get potential(): number {
        return this.obj.POTENTIAL;
    }
    set potential(value: number) {
        this.obj.POTENTIAL = value;
    }
    get use(): FermentableUse {
        return this.obj.USE;
    }
    set use(value: FermentableUse) {
        this.obj.USE = value;
    }
}

export class Bom1Hop implements Hop {

    constructor(private obj: any, private calcService: CalcService) {}

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
    }
    get alpha(): number {
        return this.obj.ALPHA;
    }
    set alpha(value: number) {
        this.obj.ALPHA = value;
    }
    get beta(): number {
        return null;
    }
    get cohumulone(): number {
        return null;
    }
    get amount(): number {
        return this.obj.AMOUNT;
    }
    set amount(value: number) {
        this.obj.AMOUNT = value;
    }
    get use(): HopUse {
        return this.obj.USE;
    }
    set use(value: HopUse) {
        this.obj.USE = value;
    }
    get temperature(): number {
        return null;
    }
    get time(): number {
        return this.obj.TIME;
    }
    set time(value: number) {
        this.obj.TIME = value;
    }
    get form(): HopForm {
        return this.obj.FORM;
    }
    set form(value: HopForm) {
        this.obj.FORM = value;
    }
}

/**
 * @todo #INIT finish Recipe interface
 */
export interface Recipe {
    name: string;
    style: string;
    vital: Vital;
    amountFermentables: number;
    fermentables: DefaultFermentable[];
    amountHops: number;
    hops: DefaultHop[];
}

export interface Vital {
    batchSize: number;
    og: number;
    fg: number;
    abv: number;
    ibu: number;
    bugu: number;
    efficiency: number;
    bv: number;
}

export interface Fermentable {
    name: string;
    amount: number;
    type: FermentableType;
    srm: number;
    potential: number;
    use: FermentableUse;
}

export interface Hop {
    name: string;
    alpha: number;
    beta: number;
    cohumulone: number;
    amount: number;
    use: HopUse;
    temperature: number;
    time: number;
    form: HopForm;
}

export class RecipeConverter {

    constructor(private recipe: any, private calcService: CalcService) {}

    convert(): DefaultRecipe {
        return {
            name: this.recipe.NAME,
            style: this.recipe.STYLE.NAME,
            vital: {
                batchSize: this.recipe.BATCH_SIZE,
                og: this.recipe.OG,
                fg: this.recipe.FG,
                abv: this.recipe.ABV,
                bugu: this.calcService.balance(this.recipe.CALCIBU, this.recipe.OG),
                ibu: this.recipe.CALCIBU,
                bv: this.recipe.BV,
                efficiency: this.recipe.EFFICIENCY
            },
            amountFermentables: this.recipe.totalAmount,
            fermentables: this.recipe.FERMENTABLES.FERMENTABLE.map(f => {
                return {
                    name: f.NAME,
                    amount: f.AMOUNT,
                    type: f.NAME.toLowerCase().indexOf('sugar') !== -1 ? 'Sugar' : 'Grain',
                    srm: f.COLOR,
                    potential: f.POTENTIAL,
                    use: f.USE,
                };
            }),
            amountHops: this.recipe.totalHop,
            hops: this.recipe.HOPS.HOP.map(h => {
                return {
                    name: h.NAME,
                    alpha: h.ALPHA,
                    beta: null,
                    cohumulone: null,
                    amount: h.AMOUNT,
                    use: h.USE,
                    temperature: null,
                    time: h.TIME,
                    form: h.FORM
                };
            })
        };
    }
}
