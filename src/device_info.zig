const std = @import("std");
const testing = std.testing;

export fn get_hostname() [*:0]const u8 {
    const a = "ppp";
    return a;
}

test "basic get hostname functionality" {
    const a = "ppp";
    std.debug.print("{s}", .{a});
    try testing.expect(get_hostname() == a);
}
