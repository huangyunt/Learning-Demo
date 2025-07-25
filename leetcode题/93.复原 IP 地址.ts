/**
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
 * 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，
 * 这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
 
 * 示例 1：
 * 输入：s = "25525511135"
 * 输出：["255.255.11.135","255.255.111.35"]

 * 示例 2：
 * 输入：s = "0000"
 * 输出：["0.0.0.0"] 

 * 示例 3：
 * 输入：s = "101023"
 * 输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 * 
 * 提示：
 * 1 <= s.length <= 20
 * 仅由数字组成
 */

function restoreIpAddresses(s: string): string[] {
    const allIPAddress: string[] = [];
    const getAllIpAddress = (str: string, ipAddress: string[]) => {
        const value1 = str.slice(0, 1);
        const value2 = str.slice(0, 2);
        const value3 = str.slice(0, 3);

        if (str.length === 0) {
            if (ipAddress.length === 4) {
                allIPAddress.push(ipAddress.join('.'))
                return;
            }
            return;
        } else {
            getAllIpAddress(str.slice(1), [...ipAddress, value1]);

            if (str.length === 2) {
                if (String(Number(value2)).length === value2.length) {
                    getAllIpAddress(str.slice(2), [...ipAddress, value2]);
                }

            }
            if (str.length >= 3) {
                if (String(Number(value2)).length === value2.length) {
                    getAllIpAddress(str.slice(2), [...ipAddress, value2]);
                }
                if (String(Number(value3)).length === value3.length && Number(value3) <= 255 && Number(value3) >= 0) {
                    getAllIpAddress(str.slice(3), [...ipAddress, value3]);
                }
            }
        }
    }
    getAllIpAddress(s, [])
    return allIPAddress;
};