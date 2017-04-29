import { ChangeService } from '../services/change.service';
import { CalcService } from '../services/calc.service';

export interface Recipe {
    name: string;
    style: string;
    vital: Vital;
    amountFermentables: number;
    fermentables: Fermentable[];
    amountHops: number;
    hops: Hop[];
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

export enum FermentableType {
    Adjunct, Extract, Grain, Sugar
}

export enum FermentableUse {
    Mash, Recirculating, Boil, Fermentation, Maduration
}

export enum HopUse {
    Mash, FWH, Boil, Aroma, DryHop
}

export enum HopForm {
    Pellet, WholeLeaf, Plug
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

    constructor(
        private obj: any = defaultRecipe,
        private calcService: CalcService,
        private changeService: ChangeService
    ) {
        this._fermentables = this.obj.FERMENTABLES.FERMENTABLE.map(f => new Bom1Fermentable(f, this.calcService, this.changeService, this));
        this._hops = this.obj.HOPS.HOP.map(h => new Bom1Hop(h, this.calcService, this.changeService, this));
        this._vital = new Bom1Vital(this.obj, this.calcService, this.changeService, this);
    }
    get object(): any {
        return this.obj;
    }

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
        this.changeService.change('name', this);
    }
    get style(): string {
        return this.obj.STYLE? this.obj.STYLE.NAME : null;
    }
    set style(value: string) {
        this.obj.STYLE = this.obj.STYLE || {};
        this.obj.STYLE.NAME = value;
        this.changeService.change('style', this);
    }
    get vital(): Vital {
        return this._vital;
    }
    set amountFermentables(value: number) {
        this.obj.totalAmount = value;
        this.changeService.change('amountFermentables', this);
    }
    get amountFermentables(): number {
        return this.obj.totalAmount;
    }
    set amountHops(value: number) {
        this.obj.totalHop = value;
        this.changeService.change('amountHops', this);
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
    constructor(
        private obj: any,
        private calcService: CalcService,
        private changeService: ChangeService,
        private recipe: Recipe
    ) { }

    get batchSize(): number {
        return this.obj.BATCH_SIZE;
    }
    set batchSize(value: number) {
        this.obj.BATCH_SIZE = value;
        this.changeService.change('vital.batchSize', this.recipe);
    }
    get og(): number {
        return this.obj.OG;
    }
    set og(value: number) {
        this.obj.OG = value;
        this.changeService.change('vital.og', this.recipe);
    }
    get fg(): number {
        return this.obj.FG;
    }
    set fg(value: number) {
        this.obj.FG = value;
        this.changeService.change('vital.fg', this.recipe);
    }
    get abv(): number {
        return this.obj.ABV;
    }
    set abv(value: number) {
        this.obj.ABV = value;
        this.changeService.change('vital.abv', this.recipe);
    }
    get ibu(): number {
        return this.obj.CALCIBU;
    }
    set ibu(value: number) {
        this.obj.CALCIBU = value;
        this.changeService.change('vital.ibu', this.recipe);
    }
    get bugu(): number {
        return this.calcService.balance(this.obj.CALCIBU, this.obj.OG);
    }
    get efficiency(): number {
        return this.obj.EFFICIENCY;
    }
    set efficiency(value: number) {
        this.obj.EFFICIENCY = value;
        this.changeService.change('vital.efficiency', this.recipe);
    }
    get bv(): number {
        return this.obj.BV;
    }
    set bv(value: number) {
        this.obj.BV = value;
        this.changeService.change('vital.bv', this.recipe);
    }
}

export class Bom1Fermentable implements Fermentable {

    constructor(
        private obj: any,
        private calcService: CalcService,
        private changeService: ChangeService,
        private recipe: Recipe
    ) { }

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
        this.changeService.change('fermentable.time', this.recipe);
    }
    get amount(): number {
        return this.obj.AMOUNT;
    }
    set amount(value: number) {
        this.obj.AMOUNT = value;
        this.changeService.change('fermentable.amount', this.recipe);
    }
    get type(): FermentableType {
        return this.obj.NAME.toLowerCase().indexOf('sugar') !== -1 ? FermentableType.Sugar : FermentableType.Grain;
    }
    get srm(): number {
        return this.obj.COLOR;
    }
    set srm(value: number) {
        this.obj.COLOR = value;
        this.changeService.change('fermentable.srm', this.recipe);
    }
    get potential(): number {
        return this.obj.POTENTIAL;
    }
    set potential(value: number) {
        this.obj.POTENTIAL = value;
        this.changeService.change('fermentable.potential', this.recipe);
    }
    get use(): FermentableUse {
        return this.obj.USE;
    }
    set use(value: FermentableUse) {
        this.obj.USE = value;
        this.changeService.change('fermentable.use', this.recipe);
    }
}

export class Bom1Hop implements Hop {

    constructor(
        private obj: any,
        private calcService: CalcService,
        private changeService: ChangeService,
        private recipe: Recipe
    ) { }

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
        this.changeService.change('hop.name', this.recipe);
    }
    get alpha(): number {
        return this.obj.ALPHA;
    }
    set alpha(value: number) {
        this.obj.ALPHA = value;
        this.changeService.change('hop.alpha', this.recipe);
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
        this.changeService.change('hop.amount', this.recipe);
    }
    get use(): HopUse {
        return this.obj.USE;
    }
    set use(value: HopUse) {
        this.obj.USE = value;
        this.changeService.change('hop.use', this.recipe);
    }
    get temperature(): number {
        return null;
    }
    get time(): number {
        return this.obj.TIME;
    }
    set time(value: number) {
        this.obj.TIME = value;
        this.changeService.change('hop.time', this.recipe);
    }
    get form(): HopForm {
        return this.obj.FORM;
    }
    set form(value: HopForm) {
        this.obj.FORM = value;
        this.changeService.change('hop.form', this.recipe);
    }
}
