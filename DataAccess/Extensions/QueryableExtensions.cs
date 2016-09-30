using System.Linq;
using System.Web.Query.Dynamic;

namespace DataAccess.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> query, int? pageSize, int? pageNumber)
        {
            if (pageSize == null || pageSize < 0) return query;
            if (pageNumber == null)
                pageNumber = 1;

            var skip =
                pageNumber > 0
                    ? pageSize.Value * (pageNumber.Value - 1)
                    : 0;
            return query.Skip(skip).Take(pageSize.Value);
        }
    }
}
