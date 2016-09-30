using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Domain.Models;
using Manager.InfoModels;
using Manager.InputInfoModels;
using Manager.Validators;

namespace Manager.Services
{
    public class OfficeService
    {
        private readonly IOfficeRepository _officeRepository;
        private readonly IMapper _mapper;
        private readonly AddOfficeValidator _addOfficeValidator;
        private readonly UpdateOfficeValidator _updateOfficeValidator;

        public OfficeService(IMapper mapper, IOfficeRepository officeRepository)
        {
            _officeRepository = officeRepository;
            _mapper = mapper;

            _addOfficeValidator=new AddOfficeValidator();
            _updateOfficeValidator=new UpdateOfficeValidator();
        }

        public IEnumerable<OfficeInfo> GetAll()
        {
            var offices = _officeRepository.GetAll();
            var officeInfos = _mapper.Map<IEnumerable<OfficeInfo>>(offices);

            return officeInfos;
        }

        public OfficeImagePartialInfo GetImagePartialById(int id)
        {
            var office = _officeRepository.GetById(id);
            var officeInfo = _mapper.Map<OfficeImagePartialInfo>(office);

            return officeInfo;
        }
        public IEnumerable<OfficePartialInfo> GetPartial()
        {
            var offices = _officeRepository.GetAll();
            var officeInfos = _mapper.Map<IEnumerable<OfficePartialInfo>>(offices);

            return officeInfos;
        }

        public int CountAllDepartmentsOfAnOffice(int officeId)
        {
            return _officeRepository.CountAllDepartmentsOfAnOffice(officeId);
        }

        public IEnumerable<DepartmentInfo> GetAllDepartmentsOfAnOffice(int officeId, int pageSize, int pageNumber) {
            var departments = _officeRepository.GetAllDepartmentsOfAnOffice(officeId, pageSize, pageNumber);
            var departmentsInfos = _mapper.Map<IEnumerable<DepartmentInfo>>(departments);

            return departmentsInfos;
        }

        public IEnumerable<EmployeeInfo> GetAllAvailableEmployeesOfAnOffice(int projectId, int officeId, int pageSize, int pageNumber, int? department = null, int? position = null) {
            var employees = _officeRepository.GetAllAvailableEmployeesOfAnOffice(projectId, officeId, pageSize, pageNumber, department, position);
            var employeesInfos = _mapper.Map<IEnumerable<EmployeeInfo>>(employees);

            return employeesInfos;
        }

        public OperationResult Add(AddOfficeInputInfo inputInfo)
        {
            if (inputInfo == null)
            {
                return new OperationResult(false, Messages.ErrorWhileAddingProject);
            }
            var validationResult =_addOfficeValidator.Validate(inputInfo);
            if (!validationResult.IsValid)
            {
                return new OperationResult(false, validationResult);
            }

            var newOffice = _mapper.Map<Office>(inputInfo);
            _officeRepository.Add(newOffice);

            return new OperationResult(true, Messages.SuccessfullyAddedOffice);
        }

        public OperationResult Update(UpdateOfficeInputInfo inputInfo)
        {
            if (inputInfo == null)
            {
                return new OperationResult(false, Messages.ErrorWhileUpdatingOffice);
            }
            var validationResult = _updateOfficeValidator.Validate(inputInfo);
            if (!validationResult.IsValid)
            {
                return new OperationResult(false, validationResult);
            }

            var office = _officeRepository.GetById(inputInfo.Id);

            if (office == null)
            {
                return new OperationResult(false, Messages.ErrorWhileUpdatingOffice);
            }

            var updatedOffice = _mapper.Map<Office>(inputInfo);

            office.Name = updatedOffice.Name;
            office.Address = updatedOffice.Address;
            office.Image = updatedOffice.Image;
            office.Phone = updatedOffice.Phone;

            updatedOffice.Id = office.Id;

            _officeRepository.Save();

            return new OperationResult(true, Messages.SuccessfullyUpdatedOffice);
        }
    }
}
