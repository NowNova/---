import { IDataRepository } from './IDataRepository.js';
import fs from 'fs';

export class DataRepository extends IDataRepository {
    constructor(filename, serializer = JSON) {
        super();
        this.filename = filename;
        this.serializer = serializer;
        this.data = this._loadData();
    }

    _loadData() {
        try {
            const fileData = fs.readFileSync(this.filename, 'utf8');
            return this.serializer.parse(fileData) || [];
        } catch (e) {
            return [];
        }
    }

    _saveData() {
        fs.writeFileSync(this.filename, this.serializer.stringify(this.data));
    }

    get_all() {
        return [...this.data];
    }

    get_by_id(id) {
        return this.data.find(item => item.id === id) || null;
    }

    add(item) {
        this.data.push(item);
        this._saveData();
    }

    update(item) {
        const index = this.data.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.data[index] = item;
            this._saveData();
        }
    }

    delete(item) {
        const index = this.data.findIndex(i => i.id === item.id);
        if (index !== -1) {
            this.data.splice(index, 1);
            this._saveData();
        }
    }
}