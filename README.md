# RobbyRobot
Решение задачи: https://www.codewars.com/kata/robby-the-robot/javascript
<img align="center" src="/imgs/robby-robot.gif">

## Run
```
npm install
npm start
```

##Функционал
1. **URL Query** используется инициализации для отражения состояния карты
2. **Mousewheel** используется для быстрого переключения значения radio кнопок
3. Для уменьшения фризов при hover по карте используется вычисление **BFS** в **webworker**'е