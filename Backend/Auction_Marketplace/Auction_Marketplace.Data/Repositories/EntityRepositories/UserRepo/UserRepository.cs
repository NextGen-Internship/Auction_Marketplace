using Auction_Marketplace.Data.Entities;

namespace Auction_Marketplace.Data.Repositories.EntityRepositories.UserRepo
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task AddAsync<T>(T entity)
        {
            await this._context.AddAsync(entity);
            await this._context.SaveChangesAsync();
        }

        public IQueryable<User> Get(int id)
        {
            return this._context.Users.Where(u => u.Id == id);
        }

        public IQueryable<User> GetAll()
        {
            return this._context.Users.Select(u => u);
        }

        public IQueryable<User> GetByEmail(string email)
        {
            return  this._context.Users.Where(x => x.Email == email);
        }

        public async Task UpdateUserAsync(User user)
        {
            this._context.Users.Update(user);
            await this._context.SaveChangesAsync();
        }
    }
}

