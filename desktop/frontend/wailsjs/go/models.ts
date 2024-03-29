export namespace storagedata {
	
	export class Category {
	    name: string;
	    description: string;
	    id: string;
	    rank: number;
	    removable: boolean;
	    renameable: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Category(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.id = source["id"];
	        this.rank = source["rank"];
	        this.removable = source["removable"];
	        this.renameable = source["renameable"];
	    }
	}
	export class Data {
	    name: string;
	    account_name: string;
	    password: string;
	    site: string;
	    remark: string;
	    id: string;
	    category_id: string;
	
	    static createFrom(source: any = {}) {
	        return new Data(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.account_name = source["account_name"];
	        this.password = source["password"];
	        this.site = source["site"];
	        this.remark = source["remark"];
	        this.id = source["id"];
	        this.category_id = source["category_id"];
	    }
	}
	export class Preferences {
	    lockPwd: string;
	    localLang: string;
	    syncBranch: number;
	
	    static createFrom(source: any = {}) {
	        return new Preferences(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.lockPwd = source["lockPwd"];
	        this.localLang = source["localLang"];
	        this.syncBranch = source["syncBranch"];
	    }
	}
	export class LoadedItems {
	    category: Category[];
	    data: Data[];
	    preferences: Preferences;
	
	    static createFrom(source: any = {}) {
	        return new LoadedItems(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.category = this.convertValues(source["category"], Category);
	        this.data = this.convertValues(source["data"], Data);
	        this.preferences = this.convertValues(source["preferences"], Preferences);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class PassDto {
	    loadedItems?: LoadedItems;
	    errorMsg: string;
	
	    static createFrom(source: any = {}) {
	        return new PassDto(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.loadedItems = this.convertValues(source["loadedItems"], LoadedItems);
	        this.errorMsg = source["errorMsg"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

