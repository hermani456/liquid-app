import { createCompany } from "@/db/queries/companies";

// Mock '@/utils/db' module
jest.mock("@/utils/db", () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}));

import pool from "@/utils/db";

describe("createCompany", () => {
  const userId = 1;
  const company = {
    name: "Test Company",
    rut: "12345678-9",
    address: "123 Test St",
    phone: "1234567890",
    icon: "🏢",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a company and return the created company", async () => {
    const mockResult = { rows: [company] };

    pool.query.mockResolvedValueOnce(mockResult);

    const result = await createCompany(userId, company);

    expect(pool.query).toHaveBeenCalledWith(
      `INSERT INTO companies (user_id, name, rut, address, phone, icon)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [
        userId,
        company.name,
        company.rut,
        company.address,
        company.phone,
        company.icon,
      ]
    );
    expect(result).toEqual(company);
  });

  it('should throw an error if the query fails', async () => {
    const mockError = new Error('Query failed');
    pool.query.mockRejectedValueOnce(mockError);

    await expect(createCompany(userId, company)).rejects.toThrow('Query failed');
  });
});
