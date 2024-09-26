import { Ad, AdContent } from '@tgc/common';
import { db } from '../database/db.config.ts';
import { AffectedRow } from '@/types/controller.type.ts';

const AD_TABLE = 'ad';
const CATEGORY_TABLE = 'category';

export function findAll(): Promise<Ad[]> {
  const sql = `
    SELECT 
      a.id,
      a.title,
      a.description,
      a.owner,
      a.price, 
      a.picture,
      a.location, 
      a.createdAt,
      a.categoryId, 
      c.name AS categoryName
    FROM ${AD_TABLE} AS a
    INNER JOIN ${CATEGORY_TABLE} AS c
    ON a.categoryId = c.id
  `;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, ads: Ad[]) => {
      if (err) {
        reject(err);
      }
      resolve(ads);
    });
  });
}

export function findOne(adId: number): Promise<Ad[]> {
  const sql = `
    SELECT 
      a.id,
      a.title,
      a.description,
      a.owner,
      a.price, 
      a.picture,
      a.location, 
      a.createdAt,
      a.categoryId, 
      c.name AS categoryName
    FROM ${AD_TABLE} AS a
    INNER JOIN ${CATEGORY_TABLE} AS c
    ON a.categoryId = c.id
    WHERE a.id = ?
  `;
  const sqlParams = [adId];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, ads: Ad[]) => {
      if (err) {
        reject(err);
      }
      resolve(ads);
    });
  });
}

// ? Should we return the inserted row id within an array (using db.all) or within an object (using dg.get)?
// ? Should we return only the inserted row id (using the RETURNING id clause) or the entire inserted row (using the RETURNING * clause)?
export function insert(adContent: AdContent): Promise<AffectedRow[]> {
  const createdAt = new Date().toISOString();
  const sql = `
    INSERT INTO ${AD_TABLE} (
      title, 
      description,
      owner,
      price,
      picture,
      location,
      categoryId,
      createdAt
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
    RETURNING id
  `;
  const sqlParams = [...Object.values(adContent), createdAt];
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
export function remove(adId: number): Promise<AffectedRow[]> {
  const sql = `
    DELETE FROM ${AD_TABLE}
    WHERE id = ? 
    RETURNING id
  `;
  const sqlParams = [adId];
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
  adId: number,
  adContent: Partial<AdContent>,
): Promise<Ad[]> {
  const keys = Object.keys(adContent);
  const values = Object.values(adContent);
  let sql = `UPDATE ${AD_TABLE} SET`;
  sql = keys.reduce((acc, key, index) => {
    const isLastKey = index === keys.length - 1;
    return (acc += ` ${key} = ?${isLastKey ? ' WHERE id = ? RETURNING *' : ','}`);
  }, sql);
  const sqlParams = [...values, adId];

  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, updatedRows: Ad[]) => {
      if (err) {
        reject(err);
      }
      resolve(updatedRows);
    });
  });
}

export function update(adId: number, adContent: AdContent): Promise<Ad[]> {
  const sql = `
    UPDATE ${AD_TABLE} 
    SET 
      title = ?,
      description = ?,
      owner = ?,
      price = ?,
      picture = ?,
      location = ?,
      categoryId = ? 
    WHERE id = ? 
    RETURNING *
  `;
  const sqlParams = [...Object.values(adContent), adId];
  return new Promise((resolve, reject) => {
    db.all(sql, sqlParams, (err, updatedRows: Ad[]) => {
      if (err) {
        reject(err);
      }
      resolve(updatedRows);
    });
  });
}
