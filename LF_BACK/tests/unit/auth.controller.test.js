const { loginAdmin } = require('../../src/controllers/auth.controller');
const AdminUser = require('../../src/models/AdminUser');
const jwt = require('jsonwebtoken');

jest.mock('../../src/models/AdminUser');
jest.mock('jsonwebtoken');

function createMockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('loginAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe responder 400 si faltan email o password', async () => {
    const req = {
      body: {
        email: '',
        password: '',
      },
    };
    const res = createMockRes();

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email y contraseña son obligatorios',
    });
  });

  test('debe responder 401 si el admin no existe', async () => {
    const req = {
      body: {
        email: 'admin@test.com',
        password: '123456',
      },
    };
    const res = createMockRes();

    AdminUser.findOne.mockResolvedValue(null);

    await loginAdmin(req, res);

    expect(AdminUser.findOne).toHaveBeenCalledWith({
      email: 'admin@test.com',
      isActive: true,
    });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Credenciales inválidas',
    });
  });

  test('debe responder 401 si la contraseña es incorrecta', async () => {
    const req = {
      body: {
        email: 'admin@test.com',
        password: 'incorrecta',
      },
    };
    const res = createMockRes();

    const fakeAdmin = {
      _id: 'abc123',
      email: 'admin@test.com',
      role: 'superadmin',
      comparePassword: jest.fn().mockResolvedValue(false),
    };

    AdminUser.findOne.mockResolvedValue(fakeAdmin);

    await loginAdmin(req, res);

    expect(fakeAdmin.comparePassword).toHaveBeenCalledWith('incorrecta');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Credenciales inválidas',
    });
  });

  test('debe responder con token y user si el login es correcto', async () => {
    const req = {
      body: {
        email: 'ADMIN@TEST.COM',
        password: '123456',
      },
    };
    const res = createMockRes();

    const fakeAdmin = {
      _id: 'abc123',
      name: 'Admin Test',
      email: 'admin@test.com',
      role: 'superadmin',
      comparePassword: jest.fn().mockResolvedValue(true),
    };

    AdminUser.findOne.mockResolvedValue(fakeAdmin);
    jwt.sign.mockReturnValue('fake-jwt-token');

    await loginAdmin(req, res);

    expect(AdminUser.findOne).toHaveBeenCalledWith({
      email: 'admin@test.com',
      isActive: true,
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        sub: 'abc123',
        email: 'admin@test.com',
        role: 'superadmin',
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    expect(res.json).toHaveBeenCalledWith({
      token: 'fake-jwt-token',
      user: {
        id: 'abc123',
        name: 'Admin Test',
        email: 'admin@test.com',
        role: 'superadmin',
      },
    });
  });

  test('debe responder 500 si ocurre un error interno', async () => {
    const req = {
      body: {
        email: 'admin@test.com',
        password: '123456',
      },
    };
    const res = createMockRes();

    AdminUser.findOne.mockRejectedValue(new Error('DB error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error al iniciar sesión',
    });

    consoleSpy.mockRestore();
  });
});