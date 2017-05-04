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

class Bom1RecipeProxyHandler {
    
    constructor(private recipe: Recipe, private changeService: ChangeService, private prefix: string) {}

    set(target, name: PropertyKey, value: any, receiver: any) {
        console.log(`Call "${this.prefix}.${name}" with value "${value}"`);
        target[name] = value;
        this.changeService.change(`${this.prefix}.${name}`, this.recipe);
        return true;
    }
}

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
        this._fermentables = this.obj.FERMENTABLES.FERMENTABLE.map(f => new Proxy<Fermentable>(new Bom1Fermentable(f, this.calcService), this.proxy('fermentable')));
        this._hops = this.obj.HOPS.HOP.map(h => new Proxy<Hop>(new Bom1Hop(h, this.calcService), this.proxy('hop')));
        this._vital = new Proxy<Vital>(new Bom1Vital(obj, this.calcService), this.proxy('vital'));
        let cs = this.changeService;
        let self = this;
        return new Proxy<Bom1Recipe>(this, this.proxy());
    }
    
    private proxy(prefix='') {
        return new Bom1RecipeProxyHandler(this, this.changeService, prefix);
    }
    get object(): any {
        return this.obj;
    }

    get name(): string {
        return this.obj.NAME;
    }
    set name(value: string) {
        this.obj.NAME = value;
    }
    get style(): string {
        return this.obj.STYLE? this.obj.STYLE.NAME : null;
    }
    set style(value: string) {
        this.obj.STYLE = this.obj.STYLE || {};
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
    constructor(
        private obj: any,
        private calcService: CalcService
    ) { }

    get batchSize(): number {
        return this.obj.BATCH_SIZE;
    }
    set batchSize(value: number) {
        this.obj.BATCH_SIZE = value;
    }
    get og(): number {
        return this.obj.OG;
    }
    set og(value: number) {
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

    constructor(
        private obj: any,
        private calcService: CalcService
    ) { }

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

    constructor(
        private obj: any,
        private calcService: CalcService
    ) { }

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
