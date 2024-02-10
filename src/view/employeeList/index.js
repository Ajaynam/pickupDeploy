
import { injectReducer } from '../../store';
import adminEmployeeReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import EmployeeTable from './components/EmployeeTable';


injectReducer('adminEmployeeList', adminEmployeeReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>Employee List</h4>
                <EmployeeTableTools />
            </div>
            <EmployeeTable />
        </Card>
    )
}

export default Employee