// Helper generators for SIM-SARPRAS
// This file adds auto-generation helpers for asset codes and inventory numbers
// and convenience functions to create assets and asset units programmatically.

'use strict';

(function(){
  // Pad number with leading zeros
  function pad(num, size = 4){
    return String(num).padStart(size, '0');
  }

  // Generate next asset code like AST-0001
  window.nextAssetCode = function(){
    if(!DB) throw new Error('Database (DB) not loaded yet');
    DB.SEQ = DB.SEQ || {};
    DB.SEQ.ASSETS = (DB.SEQ.ASSETS || 0) + 1;
    return 'AST-' + pad(DB.SEQ.ASSETS,4);
  };

  // Generate next inventory number like INV-2026-00001
  window.nextInventoryNumber = function(){
    if(!DB) throw new Error('Database (DB) not loaded yet');
    DB.SEQ = DB.SEQ || {};
    DB.SEQ.ASSET_UNITS = (DB.SEQ.ASSET_UNITS || 0) + 1;
    const y = new Date().getFullYear();
    return 'INV-' + y + '-' + String(DB.SEQ.ASSET_UNITS).padStart(5,'0');
  };

  // Create an asset using auto-generated CODE
  window.createAsset = async function(data){
    if(!DB) throw new Error('Database (DB) not loaded yet');
    const code = nextAssetCode();
    const row = Object.assign({
      ID: uid('AST'),
      CODE: code,
      NAME: '',
      CATEGORY_ID: '',
      BRAND: '',
      MODEL: '',
      SERIAL_NUMBER: '',
      ACQUISITION_YEAR: (new Date()).getFullYear(),
      UNIT_PRICE: 0,
      DESCRIPTION: '',
      ACTIVE: 'TRUE',
      CREATED_AT: nowStr()
    }, data || {});
    DB.ASSETS = DB.ASSETS || [];
    DB.ASSETS.push(row);
    await saveDB();
    try{ await audit('CREATE','ASSET',row.ID,'Membuat asset '+row.CODE); }catch(e){}
    return row;
  };

  // Create an asset unit (inventory unit) using auto-generated INVENTORY_NUMBER
  window.createAssetUnit = async function(data){
    if(!DB) throw new Error('Database (DB) not loaded yet');
    const inv = nextInventoryNumber();
    const row = Object.assign({
      ID: uid('AUN'),
      ASSET_ID: '',
      INVENTORY_NUMBER: inv,
      CONDITION_ID: '',
      BUILDING_ID: '',
      ROOM_ID: '',
      RESPONSIBLE_USER_ID: '',
      STATUS: 'TERSEDIA',
      NOTE: '',
      CREATED_AT: nowStr()
    }, data || {});
    DB.ASSET_UNITS = DB.ASSET_UNITS || [];
    DB.ASSET_UNITS.push(row);
    await saveDB();
    try{ await audit('CREATE','ASSET_UNIT',row.ID,'Membuat unit inventaris '+row.INVENTORY_NUMBER); }catch(e){}
    return row;
  };

})();
