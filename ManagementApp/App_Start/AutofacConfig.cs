using System;
using System.Linq;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using AutoMapper;
using Contracts;
using DataAccess.Context;
using DataAccess.Repositories;
using Manager.Mapper;

namespace ManagementApp.App_Start
{
    public static class AutofacConfig
    {
        public static void Initialize(HttpConfiguration config)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(
                RegisterServices(new ContainerBuilder())
            );
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).PropertiesAutowired();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            RegisterContexts(builder);
            RegisterRepository(builder);
            RegisterApplicationServices(builder);
            RegisterAutomapper(builder);

            return builder.Build();
        }

        private static void RegisterAutomapper(ContainerBuilder builder)
        {
            builder.Register(c => new MapperConfiguration(cfg => { cfg.AddProfile(new MappingConfig()); }))
                .AsSelf()
                .SingleInstance();

            builder.Register(c => c.Resolve<MapperConfiguration>().CreateMapper(c.Resolve))
                .As<IMapper>()
                .InstancePerLifetimeScope();
        }

        private static void RegisterApplicationServices(ContainerBuilder builder)
        {
            var managerAssembly = Assembly.Load("Manager");
            builder.RegisterAssemblyTypes(managerAssembly)
                   .Where(t => t.Name.EndsWith("Service", StringComparison.OrdinalIgnoreCase));
            builder.RegisterAssemblyTypes(managerAssembly).AsImplementedInterfaces();
        }
      
        private static void RegisterContexts(ContainerBuilder builder)
        {
            builder.RegisterType<DbContext>().InstancePerRequest();
        }

        private static void RegisterRepository(ContainerBuilder builder)
        {
            builder.RegisterType<DepartmentRepository>().As<IDepartmentRepository>();
            builder.RegisterType<EmployeeRepository>().As<IEmployeeRepository>();
            builder.RegisterType<ProjectRepository>().As<IProjectRepository>();
            builder.RegisterType<OfficeRepository>().As<IOfficeRepository>();
        }

    }
}