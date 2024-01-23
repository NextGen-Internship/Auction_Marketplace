using Auction_Marketplace.Data.Entities;
using Auction_Marketplace.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Auction_Marketplace.Data.Repositories.Implementations
{
    public class CauseRepository : BaseRepository<Cause>, ICauseRepository
    {
        public CauseRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task AddCause(Cause cause)
        {
            await _context.Causes.AddAsync(cause);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCause(int causeId)
        {
            var cause = FindCauseById(causeId);

            if(cause != null)
            {
                _context.Causes.Remove(await cause);
                await _context.SaveChangesAsync();
            }

        }

        public Task<Cause> FindCauseById(int causeId)
        {
            Cause cause = _context.Causes.FirstOrDefault(c => c.CauseId == causeId);
            return Task.FromResult(cause);
        }

        public async Task UpdateCause(Cause cause)
        {
            _context.Entry(cause).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}