import { Component } from '@angular/core';
import { ReportsService } from './services/report.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  clientsCount: number = 0;
  moviesCount: number = 0;
  genresCount: number = 0;
  inactiveCount: number = 0;
  activeCount: number = 0;

  constructor(private reportsService: ReportsService) {}
  ngOnInit() {
    this.totalClients();
    this.totalMovies();
    this.totalGenres();
    this.totalActive();
    this.totalInactive();
  }

  totalClients() {
    this.reportsService.getDashboardDataClient().subscribe((count) => {
      this.clientsCount = count;
    });
  }
  totalMovies(){
    this.reportsService.getDashboardDataMovie().subscribe((count)=>{
      this.moviesCount = count
    })
  }
  totalGenres(){
    this.reportsService.getDashboardDataGenre().subscribe((count)=>{
      this.genresCount = count
    })
  }
  totalActive(){
    this.reportsService.getDashboardDataActive().subscribe((count)=>{
      this.activeCount = count
    })
  }
  totalInactive(){
    this.reportsService.getDashboardDataInactive().subscribe((count)=>{
      this.inactiveCount = count
    })
  }
}
