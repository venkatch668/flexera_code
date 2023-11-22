import './index.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function CardItem(props:any) {
  return (
    <div className="cardItem">
      <Card >
          <CardMedia
            component="img"
            height="140"
            image={props?.item?.owner?.avatar_url}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props?.item?.full_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props?.item?.description}
            </Typography>
          </CardContent>    
      </Card>
    </div>
  );
}

export default CardItem;
