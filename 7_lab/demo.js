const LifeStyle = {
    PerRequest: 'PerRequest',
    Scoped: 'Scoped',
    Singleton: 'Singleton'
};

class Injector {
    constructor() {
        this.registrations = new Map();
        this.singletonInstances = new Map();
        this.scopedInstances = new Map();
        this.isInScope = false;
    }

    register(interfaceType, classTypeOrFactory, lifeStyle = LifeStyle.PerRequest, params = []) {
        this.registrations.set(interfaceType, {
            classTypeOrFactory,
            lifeStyle,
            params
        });
    }

    getInstance(interfaceType) {
        if (!this.registrations.has(interfaceType)) {
            throw new Error(`No registration found for ${interfaceType.name}`);
        }

        const { classTypeOrFactory, lifeStyle, params } = this.registrations.get(interfaceType);

        switch (lifeStyle) {
            case LifeStyle.PerRequest:
                return this.createInstance(classTypeOrFactory, params);
            case LifeStyle.Scoped:
                if (!this.isInScope) {
                    throw new Error('Cannot resolve Scoped instance outside of a scope');
                }
                if (!this.scopedInstances.has(interfaceType)) {
                    this.scopedInstances.set(interfaceType, this.createInstance(classTypeOrFactory, params));
                }
                return this.scopedInstances.get(interfaceType);
            case LifeStyle.Singleton:
                if (!this.singletonInstances.has(interfaceType)) {
                    this.singletonInstances.set(interfaceType, this.createInstance(classTypeOrFactory, params));
                }
                return this.singletonInstances.get(interfaceType);
            default:
                throw new Error(`Unknown life style: ${lifeStyle}`);
        }
    }

    createInstance(classTypeOrFactory, params) {
        if (typeof classTypeOrFactory === 'function') {
            if (classTypeOrFactory.prototype === undefined) {
                return classTypeOrFactory(...params);
            }
            const instance = new classTypeOrFactory(...params);
            
            if (instance.__dependencies) {
                for (const [prop, depType] of Object.entries(instance.__dependencies)) {
                    instance[prop] = this.getInstance(depType);
                }
            }
            
            return instance;
        }
        throw new Error('Invalid class type or factory');
    }

    scope(callback) {
        if (this.isInScope) {
            return callback();
        }

        this.isInScope = true;
        this.scopedInstances.clear();
        try {
            const result = callback();
            this.isInScope = false;
            return result;
        } catch (error) {
            this.isInScope = false;
            throw error;
        }
    }
}

function inject(dependencies) {
    return function(target) {
        target.prototype.__dependencies = dependencies;
        return target;
    };
}

class ILogger {
    log(message) {
        throw new Error('Method not implemented');
    }
}

class IDataService {
    fetchData() {
        throw new Error('Method not implemented');
    }
}

class ICalculator {
    add(a, b) {
        throw new Error('Method not implemented');
    }
}

class DebugLogger extends ILogger {
    log(message) {
        console.debug(`[DEBUG] ${message}`);
    }
}

class ReleaseLogger extends ILogger {
    log(message) {
        console.log(`[INFO] ${message}`);
    }
}

class MockDataService extends IDataService {
    fetchData() {
        return ['mock', 'data'];
    }
}

const RealDataService = inject({ logger: ILogger })(
    class RealDataService extends IDataService {
        fetchData() {
            this.logger.log('Fetching data from server...');
            return ['real', 'data', 'from', 'server'];
        }
    }
);

class SimpleCalculator extends ICalculator {
    add(a, b) {
        return a + b;
    }
}

class ScientificCalculator extends ICalculator {
    add(a, b) {
        return a + b;
    }
}

function createCalculator(type) {
    return type === 'scientific' 
        ? new ScientificCalculator() 
        : new SimpleCalculator();
}

function configureDebug(injector) {
    injector.register(ILogger, DebugLogger, LifeStyle.Singleton);
    injector.register(IDataService, MockDataService, LifeStyle.PerRequest);
    injector.register(ICalculator, () => createCalculator('simple'), LifeStyle.PerRequest);
}

function configureRelease(injector) {
    injector.register(ILogger, ReleaseLogger, LifeStyle.Singleton);
    injector.register(IDataService, RealDataService, LifeStyle.Scoped);
    injector.register(ICalculator, () => createCalculator('scientific'), LifeStyle.Singleton);
}
// // // // demonstrate
function demonstrate(injector, scenarioName) {
    console.log(`\n=== ${scenarioName} ===`);

    const logger1 = injector.getInstance(ILogger);
    const logger2 = injector.getInstance(ILogger);
    console.log(`Singleton check (should be true): ${logger1 === logger2}`);
    logger1.log('This is a log message');

    injector.scope(() => {
        const dataService1 = injector.getInstance(IDataService);
        const dataService2 = injector.getInstance(IDataService);
        const isScopedSame = dataService1 === dataService2;
        
        console.log(`Scoped/PerRequest check (Scoped should be true, PerRequest false): ${isScopedSame}`);
        console.log('Data:', dataService1.fetchData());

        injector.scope(() => {
            const nestedDataService = injector.getInstance(IDataService);
            console.log(`Nested scope check (should match parent for Scoped): ${nestedDataService === dataService1}`);
        });
    });

    const calculator = injector.getInstance(ICalculator);
    console.log(`Calculator result (2 + 3): ${calculator.add(2, 3)}`);
}

const injectorDebug = new Injector();
configureDebug(injectorDebug);

const injectorRelease = new Injector();
configureRelease(injectorRelease);

demonstrate(injectorDebug, "Debug Configuration");
demonstrate(injectorRelease, "Release Configuration");

console.log('\n=== PerRequest Check ===');
const dataService1 = injectorDebug.getInstance(IDataService);
const dataService2 = injectorDebug.getInstance(IDataService);
console.log(`PerRequest instances different (should be false): ${dataService1 === dataService2}`);