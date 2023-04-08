const mockApiClient = {
    get: jest.fn(() => Promise.resolve({ data: { csrf_token: "mock_csrf_token" } })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    put: jest.fn(() => Promise.resolve({ data: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {} })),
    defaults: { headers: { common: {} } },
};

export default mockApiClient;
