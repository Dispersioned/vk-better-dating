import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

export class DataBase {
  collectedDataPath = resolve('..', 'database');
  dbPath = join(this.collectedDataPath, 'db.json');

  constructor() {}

  init = async () => {
    if (!existsSync(this.collectedDataPath)) {
      mkdirSync(this.collectedDataPath, { recursive: true });
      console.log('All systems inited');
      console.log('Server will collect data');
    }

    if (this.dbExists()) await this.loadDB();
    else await this.createDB();
  };

  loadDB = async () => {
    const data = await readFile(this.dbPath);
    this.db = JSON.parse(data);
  };

  createDB = async () => {
    this.db = {
      collections: {},
    };
    await this.save();
  };

  save = async () => {
    await writeFile(this.dbPath, JSON.stringify(this.db));
    console.log('database saved');
  };

  dbExists = () => {
    return existsSync(this.dbPath);
  };

  createCollection = (name) => {
    if (Object.keys(this.db.collections).includes(name)) {
      console.log(`collection "${name}" already exists`);
      return;
    }

    this.db.collections[name] = {
      items: [],
    };

    return this.getCollection(name);
  };

  getCollection = (name) => {
    const collection = this.db.collections[name];
    const items = collection.items;

    if (!items) {
      throw new Error(`collection "${name}" does not exist`);
    }

    function findAll() {
      return items;
    }

    function findById(id) {
      return items.find((item) => item.id === id);
    }

    function insert(newItem) {
      if (items.find((item) => item.id === newItem.id)) {
        console.log(
          `can not insert item with id: "${newItem.id}" into "${name}" collection. Item with this id already exists`
        );
        return;
      } else items.push(newItem);
    }

    function insertUnique(newItems) {
      const ids = items.map((item) => item.id);
      const uniqueItems = [];
      newItems.forEach((item) => {
        if (!ids.includes(item.id)) uniqueItems.push(item);
      });

      uniqueItems.forEach(insert);
      return uniqueItems;
    }

    const createdCollection = {
      ...collection,
      findAll,
      findById,
      insert,
      insertUnique,
    };

    return createdCollection;
  };
}

export const db = new DataBase();
