// ERA+를 통한 승률
function Win_Rate(ERA_plus){
    return ( (ERA_plus^2) / ((ERA_plus^2) + 10000) )
}

function WAR_P(ERA_plus,Inning){
    return ( Win_Rate(ERA_plus) / (9*Inning) )
}

