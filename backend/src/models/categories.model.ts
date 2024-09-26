import { Category, CategoryContent } from '@tgc/common';
import { db } from '../database/db.config.ts';
import { AffectedRow } from '@/types/controller.type.ts';

const TABLE = 'category';

export function findAll(): Promise<Category[]> {
  const sql = `
    SELECT 
      id,
      name
    FROM ${TABLE}
  `;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, categories: Category[]) => {
      if (err) {
        reject(err);
      }
      resolve(categories);
    });
  });
}

export function findOne(adId: number): Promise<Category[]> {
  const sql = `
    SELECT 
      id,
      name
      FROM ${TABLE}
    WHERE id = ?
  `;
  const sqlParams = [adId];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, categories: Category[]) => {
      if (err) {
        reject(err);
      }
      resolve(categories);
    });
  });
}

export function insert(
  categoryContent: CategoryContent,
): Promise<AffectedRow[]> {
  const sql = `
    INSERT INTO ${TABLE}
    (name)
    VALUES (?)
    RETURNING id
  `;
  const sqlParams = [...Object.values(categoryContent)];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, insertedRow: AffectedRow[]) => {
      if (err) {
        reject(err);
      }
      resolve(insertedRow);
    });
  });
}

// ? Should we return the deletedRow row id within an array (using db.all) or within an object (using dg.get)?
export function remove(categoryId: number): Promise<AffectedRow[]> {
  const sql = `
    DELETE FROM ${TABLE}
    WHERE id = ?
    RETURNING id
  `;
  const sqlParams = [categoryId];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, deletedRow: AffectedRow[]) => {
      if (err) {
        reject(err);
      }
      resolve(deletedRow);
    });
  });
}

export function partialUpdate(
  categoryId: number,
  categoryContent: CategoryContent,
): Promise<Category[]> {
  const keys = Object.keys(categoryContent);
  const values = Object.values(categoryContent);
  let sql = `UPDATE ${TABLE} SET`;
  sql = keys.reduce((acc, key, index) => {
    const isLastKey = index === keys.length - 1;
    return (acc += ` ${key} = ?${isLastKey ? ' WHERE id = ? RETURNING *' : ','}`);
  }, sql);
  const sqlParams = [...values, categoryId];

  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, updatedRows: Category[]) => {
      if (err) {
        reject(err);
      }
      resolve(updatedRows);
    });
  });
}

export function update(
  categoryId: number,
  adContent: CategoryContent,
): Promise<Category[]> {
  const sql = `
    UPDATE ${TABLE}
    SET name = ? 
    WHERE id = ?
    RETURNING *
  `;
  const sqlParams = [...Object.values(adContent), categoryId];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, updatedRows: Category[]) => {
      if (err) {
        reject(err);
      }
      resolve(updatedRows);
    });
  });
}
