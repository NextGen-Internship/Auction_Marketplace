using System;
using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Data.Repositories.EntityRepositories.UserRepo
{
    public interface IUserRepository : IRepository
    {
        public IQueryable<User> Get(int id);

        public IQueryable<User> GetAll();

        public IQueryable<User> GetByEmail(string email);

        public Task UpdateUserAsync(User user);

        public Task AddAsync<T>(T entity);
    }
}

