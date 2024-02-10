
import { injectReducer } from '../../store';
import adminCategoryReducer from './store';
import { Card } from './../../components/ui';
import EmployeeTableTools from './components/EmployeeTableTools';
import CategoryTable from './components/CategoryTable';


injectReducer('adminCategoryList', adminCategoryReducer)

const Employee = () => {
    return (
        <Card className='mb-8'>
            <div className="md:flex items-center justify-between mb-6">
                <h4>All  Category List</h4>
                <EmployeeTableTools />
            </div>
            <CategoryTable />
        </Card>
    )
}

export default Employee