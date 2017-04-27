import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './trending/trending.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: PageNotFoundComponent }
];
