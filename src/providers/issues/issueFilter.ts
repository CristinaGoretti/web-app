import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {Issue} from '../../models/issue';

@Pipe({
  name: 'customerEmailFilter'
})
@Injectable()
export class IssueFilterProvider implements PipeTransform {
  transform(customers: Issue[], args: any[]): any {
    return customers.filter(customer => customer.description.toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
  }
}
//https://octoperf.com/blog/2016/04/05/angular2-ngfor-filter-using-pipes/