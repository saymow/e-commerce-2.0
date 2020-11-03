import User from '../../models/User';

export default {
  render(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      contactNumber: user.contact_number,
      birthDate: user.birth_date,
      isConfirmed: user.is_confirmed,
      isAdmin: user.is_admin,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  },
};
