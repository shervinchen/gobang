// 基本棋型：长连，连五，活四，冲四（眠四），活三，眠三，活二，眠二，活一，眠一
// 下一子成活 n 就是活 n-1，能成眠 n 就是眠 n-1
// 死四、死三、死二不加入基本棋型里

// 1、2分别代表棋子  0代表空位
// 连五：11111
// 活四：011110
// 冲四：211110  11101  11011
// 活三：011100  011010
// 眠三：211100  211010  210110  11001  10101  2011102
// 活二：001100  011000  001010  010010
// 眠二：211000  210100  210010  10001  2001102  2010102
// 活一：001000  010000
// 眠一：210000  2010002  2001002

// 组合棋型单独给分数 比如双冲四、双活三、冲四活三这些大概率必胜的组合棋型，以及活三眠三、双活二、活二眠二
// 111010111 双冲四
// 111010011 冲四眠三   111010101冲四眠三  111010110冲四眠三

// 单个点的棋型判断思路
// 取出9个格子
// 1、先判断单一棋型，从棋型级别由高到低判断（连5、活4、眠4依次往下...优先判断活再判断眠），
// 如果匹配上某一个棋型的其中一个类型以后，就直接终止判断（不用再判断这个棋型的其他类型和低于这个棋型级别的其他棋型了）
// 比如匹配上 011100 这种活三   那其他活三和比活三低的级别都不用判断了
// 2、然后判断特殊棋型，比如双冲四（价值相当于一个活四）、双眠三（1010101 价值相当于一个活三），暂时先只判断双冲四的情况，因为威胁最大，后续再考虑更细致的情况，进行优化

// 在判断整个棋局棋型的时候再判断组合棋型（组合棋型考虑哪些呢 比如 双冲四、双活三、冲四活三、冲四眠三、活三眠三、双活二、活二眠二  这些？）暂时只统计三种必杀的组合棋型： 双冲四、双活三、冲四活三

// 加上所有非对称棋型的反向情况
const CHESS_CROSS_SHAPES = {
  FIVE: '11111',
  FOUR: '011110',
  DOUBLE_BLOCKED_FOUR: [
    '111010111',
    '111011011',
    '110110111',
    '110111011',
    '111011101',
    '101110111',
    '110110110',
    '011011011',
    '010111011',
    '110111010',
    '011011101',
    '101110110',
    '010111010'
  ],
  BLOCKED_FOUR: ['211110', '011112', '11101', '10111', '11011'],
  THREE: ['011100', '001110', '011010', '010110'],
  BLOCKED_THREE: [
    '211100',
    '001112',
    '211010',
    '010112',
    '210110',
    '011012',
    '11001',
    '10011',
    '10101',
    '2011102'
  ],
  TWO: ['001100', '011000', '000110', '001010', '010100', '010010'],
  BLOCKED_TWO: [
    '211000',
    '000112',
    '210100',
    '001012',
    '210010',
    '010012',
    '10001',
    '2001102',
    '2011002',
    '2010102'
  ],
  ONE: ['001000', '000100', '010000', '000010'],
  BLOCKED_ONE: ['210000', '000012', '2010002', '2000102', '2001002']
}

const CHESS_CIRCLE_SHAPES = {}

export default { CHESS_CROSS_SHAPES, CHESS_CIRCLE_SHAPES }

// 111011011   1110 1 1101
// 9个格子所有活四的情（一个活四）： 011110000 001111000 000111100  000011110
// 001110000  000111000 000011100

// 0000 1 0000
// 0001 1 0000

// 101110111
// 101111011

// 110110111
// 110111011
// 110111101

// 111010111
// 111011011
// 111011101
// 111011110
