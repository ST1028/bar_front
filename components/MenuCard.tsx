
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuList from './MenuList';
import { Menu } from '@/src/types/Models/Menu';
import { Friend } from '@/src/types/Models/Friend';
import { MenuCategory } from '@/src/types/Models/MenuCategory';

interface MenuCardProps {
  menus: Menu[];
  friends: Friend[];
  menuCategory: MenuCategory;
  setSnackBarOpen: (open: boolean) => void;
  loading: boolean;
}

export default function RecipeReviewCard({ menus, friends, menuCategory, setSnackBarOpen, loading }: MenuCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="370"
        image={menuCategory.thumbnail}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Selecting meticulously from Medoc classified wines and the preferred wines of connoisseurs from all over the world!
        </Typography>
      </CardContent>
      <CardContent sx={{paddingBottom: "0px !important"}}>
          <Typography paragraph>Menu</Typography>
          <Typography paragraph>
            <MenuList menus={menus} friends={friends} setSnackBarOpen={setSnackBarOpen} loading={loading}/>
          </Typography>
        </CardContent>
        
    </Card>
  );
}
