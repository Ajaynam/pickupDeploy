
import { injectReducer } from '../../store';
import adminMaterialGradeReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import MaterialGradeTable from './components/MaterialGradeTable';


injectReducer('adminMaterialGradeList', adminMaterialGradeReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All  MaterialGrade List</h4>
                <EmployeeTableTools />
            </div>
            <MaterialGradeTable />
        </Card>
    )
}

export default Employee