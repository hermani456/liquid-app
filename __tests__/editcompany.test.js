// companies.test.js
import { editCompany } from '@/db/queries/companies';

// Mock '@/utils/db' module
jest.mock('@/utils/db', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import pool from '@/utils/db';

describe('editCompany', () => {
  const userId = 1;
  const company = {
    id: 1,
    name: 'Updated Company',
    rut: '98765432-1',
    address: '456 Updated St',
    phone: '0987654321',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update the company and return the updated company', async () => {
    const mockResult = { rows: [company] };
    pool.query.mockResolvedValueOnce(mockResult);

    const result = await editCompany(userId, company);

    expect(pool.query).toHaveBeenCalledWith(
      `UPDATE companies
        SET name = $1, rut = $2, address = $3, phone = $4
        WHERE user_id = $5 AND id = $6
        RETURNING *`,
      [company.name, company.rut, company.address, company.phone, userId, company.id]
    );
    expect(result).toEqual(company);
  });

  it('should throw an error if the query fails', async () => {
    const mockError = new Error('Query failed');
    pool.query.mockRejectedValueOnce(mockError);

    await expect(editCompany(userId, company)).rejects.toThrow('Query failed');
  });
});