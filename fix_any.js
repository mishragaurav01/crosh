const fs = require('fs');
const path = require('path');

const cwd = path.resolve(process.cwd(), 'backend');

function replaceAny(filePath, find, replace) {
    const full = path.join(cwd, filePath);
    if (!fs.existsSync(full)) return;
    let cnt = fs.readFileSync(full, 'utf8');
    cnt = cnt.replace(find, replace);
    fs.writeFileSync(full, cnt);
}

replaceAny('src/application/variant/variant.service.ts', 'data: any', 'data: import("../../domain/variant/variant.types.js").Variant');
replaceAny('src/application/variant/variant.service.ts', 'data: any', 'data: Partial<import("../../domain/variant/variant.types.js").Variant>');

replaceAny('src/application/pricing/pricing.service.ts', 'data: any', 'data: import("../../domain/pricing/pricing.types.js").Price');
replaceAny('src/application/pricing/pricing.service.ts', 'data: any', 'data: Partial<import("../../domain/pricing/pricing.types.js").Price>');
replaceAny('src/application/pricing/pricing.service.ts', 'error: any', 'error: unknown');
replaceAny('src/application/pricing/pricing.service.ts', 'error.code === 11000', '(error as Record<string, unknown>).code === 11000');

replaceAny('src/domain/product/product.mapper.ts', 'let categoryMap: any', 'let categoryMap: Record<string, unknown> | string');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');

replaceAny('src/domain/product/product.mapper.ts', 'let collectionMap: any', 'let collectionMap: Record<string, unknown> | string');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');
replaceAny('src/domain/product/product.mapper.ts', 'as any', 'as Record<string, unknown>');


replaceAny('src/tests/unit/inventory.service.spec.ts', 'mockRepo: any', 'mockRepo: Record<string, unknown>');
replaceAny('src/tests/unit/inventory.service.spec.ts', 'fakeInventory: any', 'fakeInventory: Record<string, unknown>');
replaceAny('src/tests/unit/inventory.service.spec.ts', 'mockRepo as any', 'mockRepo as unknown as import("../../app/repositories/inventory.repository.js").InventoryRepository');

replaceAny('src/tests/unit/catalog.test.ts', 'as any', 'as never');
replaceAny('src/tests/unit/catalog.test.ts', 'as any', 'as never');
replaceAny('src/tests/unit/catalog.test.ts', 'as any', 'as never');
replaceAny('src/tests/unit/catalog.test.ts', 'as any', 'as never');
replaceAny('src/tests/unit/catalog.test.ts', 'as any', 'as never');

console.log("Types fixed roughly");
